from flask import Blueprint, request, jsonify
from models import User, db
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
import json
import traceback

users_bp = Blueprint('users', __name__)

# ---------------- GET ALL USERS ----------------
@users_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        # ✅ Directly check if user is admin
        is_admin = current_user and current_user.role == 'admin'
        if not is_admin:
            return jsonify({"error": "Admin access required"}), 403
        
        users = User.query.all()
        return jsonify([{
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'created_at': user.created_at.isoformat() if user.created_at else None
        } for user in users])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- GET SINGLE USER ----------------
@users_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user:
            return jsonify({"error": "User not found"}), 404
            
        if current_user.id != user_id and not current_user.is_admin():
            return jsonify({"error": "Access denied"}), 403
        
        user = User.query.get_or_404(user_id)
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'created_at': user.created_at.isoformat() if user.created_at else None
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- UPDATE USER ----------------
@users_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user:
            return jsonify({"error": "User not found"}), 404
        
        # ✅ Check role directly instead of using is_admin()
        is_admin = current_user.role == 'admin'
        if current_user.id != user_id and not is_admin:
            return jsonify({"error": "Access denied"}), 403
        
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        if 'username' in data:
            if User.query.filter(User.username == data['username'], User.id != user_id).first():
                return jsonify({"error": "Username already exists"}), 400
            user.username = data['username']
            
        if 'email' in data:
            if User.query.filter(User.email == data['email'], User.id != user_id).first():
                return jsonify({"error": "Email already exists"}), 400
            user.email = data['email']
            
        if 'role' in data and is_admin:
            user.role = data['role']
            
        if 'password' in data:
            user.password = generate_password_hash(data['password'])
        
        db.session.commit()
        return jsonify({"message": "User updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



# ---------------- DELETE USER ----------------
@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if not current_user or not current_user.is_admin():
            return jsonify({"error": "Admin access required"}), 403
        
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ---------------- LOGIN ----------------
@users_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({"error": "Username and password required"}), 400

        user = User.query.filter_by(username=data.get('username')).first()

        # ✅ Verify password using check_password_hash here in route
        if user and check_password_hash(user.password, data.get('password')):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
            })

        return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        print("LOGIN ERROR:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ---------------- REGISTER ----------------
@users_bp.route('/register', methods=['POST'])
def register():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
            if not data and request.data:
                try:
                    data = json.loads(request.data.decode('utf-8'))
                except:
                    return jsonify({"error": "Request must be JSON or form data"}), 415

        if not data:
            return jsonify({"error": "No data provided"}), 400

        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        if User.query.filter_by(username=data['username']).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email already exists"}), 400

        # ✅ Hash password directly here
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password,
            role=data.get('role', 'user')
        )

        db.session.add(user)
        db.session.commit()

        # ✅ Create JWT token immediately after registration
        access_token = create_access_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@users_bp.route('/logout', methods=['POST'])
@jwt_required()  # Make sure only logged-in users can hit this
def logout():
    response = jsonify({"message": "Successfully logged out"})
    unset_jwt_cookies(response)  # This clears the JWT cookies
    return response, 200
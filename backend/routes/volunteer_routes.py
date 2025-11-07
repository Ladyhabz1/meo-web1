from flask import Blueprint, request, jsonify
from models import Volunteer, User, db
from flask_jwt_extended import jwt_required, get_jwt_identity

volunteers_bp = Blueprint('volunteers', __name__)

def volunteer_to_dict(volunteer):
    """Helper function to convert Volunteer object to dictionary"""
    return {
        'id': volunteer.id,
        'name': volunteer.name,
        'email': volunteer.email,
        'phone': volunteer.phone,
        'joined_at': volunteer.joined_at.isoformat(),
        'skills': volunteer.skills,
        'availability': volunteer.availability,
        'user_id': volunteer.user_id
    }

@volunteers_bp.route('/volunteers', methods=['GET'])
@jwt_required()
def get_volunteers():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    # Only admins can see all volunteers
    if not current_user.is_admin():
        return jsonify({"error": "Admin access required"}), 403
    
    volunteers = Volunteer.query.all()
    return jsonify([volunteer_to_dict(volunteer) for volunteer in volunteers])

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['GET'])
@jwt_required()
def get_volunteer(volunteer_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    
    # Users can only see their own profile, admins can see any
    if volunteer.user_id != current_user_id and not current_user.is_admin():
        return jsonify({"error": "Access denied"}), 403
    
    return jsonify(volunteer_to_dict(volunteer))

@volunteers_bp.route('/volunteers', methods=['POST'])
@jwt_required()
def create_volunteer():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'email', 'phone']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Check if user already has a volunteer profile
    if current_user.volunteer_profile:
        return jsonify({"error": "User already has a volunteer profile"}), 400
    
    # Check if email already exists (unless admin is creating for someone else)
    if 'user_id' in data and data['user_id'] != current_user_id:
        # Only admins can create volunteer profiles for other users
        if not current_user.is_admin():
            return jsonify({"error": "Admin access required to create profiles for other users"}), 403
        
        target_user = User.query.get(data['user_id'])
        if not target_user:
            return jsonify({"error": "Target user not found"}), 404
        
        if target_user.volunteer_profile:
            return jsonify({"error": "Target user already has a volunteer profile"}), 400
        
        user_id = data['user_id']
    else:
        user_id = current_user_id
    
    # Check if email already exists
    existing_volunteer = Volunteer.query.filter_by(email=data['email']).first()
    if existing_volunteer and existing_volunteer.user_id != user_id:
        return jsonify({"error": "Email already registered with another volunteer"}), 400
    
    volunteer = Volunteer(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        skills=data.get('skills'),
        availability=data.get('availability', 'flexible'),
        user_id=user_id
    )
    
    db.session.add(volunteer)
    db.session.commit()
    
    return jsonify(volunteer_to_dict(volunteer)), 201

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['PUT'])
@jwt_required()
def update_volunteer(volunteer_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    
    # Users can only update their own profile, admins can update any
    if volunteer.user_id != current_user_id and not current_user.is_admin():
        return jsonify({"error": "Access denied"}), 403
    
    data = request.get_json()
    
    # Validate email uniqueness if changing email
    if 'email' in data and data['email'] != volunteer.email:
        existing_volunteer = Volunteer.query.filter_by(email=data['email']).first()
        if existing_volunteer and existing_volunteer.id != volunteer_id:
            return jsonify({"error": "Email already registered with another volunteer"}), 400
    
    # Update fields
    allowed_fields = ['name', 'email', 'phone', 'skills', 'availability']
    for field in allowed_fields:
        if field in data:
            setattr(volunteer, field, data[field])
    
    db.session.commit()
    return jsonify({
        "message": "Volunteer profile updated successfully",
        "volunteer": volunteer_to_dict(volunteer)
    })

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['DELETE'])
@jwt_required()
def delete_volunteer(volunteer_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    
    # Users can only delete their own profile, admins can delete any
    if volunteer.user_id != current_user_id and not current_user.is_admin():
        return jsonify({"error": "Access denied"}), 403
    
    db.session.delete(volunteer)
    db.session.commit()
    return jsonify({"message": "Volunteer profile deleted successfully"})

@volunteers_bp.route('/volunteers/me', methods=['GET'])
@jwt_required()
def get_my_volunteer_profile():
    """Get the current user's volunteer profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.volunteer_profile:
        return jsonify({"error": "No volunteer profile found"}), 404
    
    return jsonify(volunteer_to_dict(current_user.volunteer_profile))

@volunteers_bp.route('/volunteers/me', methods=['PUT'])
@jwt_required()
def update_my_volunteer_profile():
    """Update the current user's volunteer profile"""
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.volunteer_profile:
        return jsonify({"error": "No volunteer profile found"}), 404
    
    volunteer = current_user.volunteer_profile
    data = request.get_json()
    
    #!Validate email uniqueness if changing email
    if 'email' in data and data['email'] != volunteer.email:
        existing_volunteer = Volunteer.query.filter_by(email=data['email']).first()
        if existing_volunteer and existing_volunteer.id != volunteer.id:
            return jsonify({"error": "Email already registered with another volunteer"}), 400
    
    # Update fields
    allowed_fields = ['name', 'email', 'phone', 'skills', 'availability']
    for field in allowed_fields:
        if field in data:
            setattr(volunteer, field, data[field])
    
    db.session.commit()
    return jsonify({
        "message": "Volunteer profile updated successfully",
        "volunteer": volunteer_to_dict(volunteer)
    })
from flask import Blueprint, request, jsonify
from models import Volunteer, db
from flask_jwt_extended import jwt_required, get_jwt_identity

volunteers_bp = Blueprint('volunteers', __name__)

@volunteers_bp.route('/volunteers', methods=['GET'])
def get_volunteers():
    volunteers = Volunteer.query.all()
    return jsonify([{
        'id': volunteer.id,
        'name': volunteer.name,
        'email': volunteer.email,
        'phone': volunteer.phone,
        'joined_at': volunteer.joined_at.isoformat(),
        'skills': volunteer.skills,
        'availability': volunteer.availability,
        'user_id': volunteer.user_id
    } for volunteer in volunteers])

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['GET'])
def get_volunteer(volunteer_id):
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    return jsonify({
        'id': volunteer.id,
        'name': volunteer.name,
        'email': volunteer.email,
        'phone': volunteer.phone,
        'joined_at': volunteer.joined_at.isoformat(),
        'skills': volunteer.skills,
        'availability': volunteer.availability,
        'user_id': volunteer.user_id
    })

@volunteers_bp.route('/volunteers', methods=['POST'])
@jwt_required()
def create_volunteer():
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    data = request.get_json()
    
    # Check if user already has a volunteer profile
    if current_user.volunteer_profile:
        return jsonify({"error": "User already has a volunteer profile"}), 400
    
    volunteer = Volunteer(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        skills=data.get('skills'),
        availability=data.get('availability', 'flexible'),
        user_id=current_user_id
    )
    
    db.session.add(volunteer)
    db.session.commit()
    
    return jsonify({
        'id': volunteer.id,
        'name': volunteer.name,
        'email': volunteer.email,
        'phone': volunteer.phone,
        'joined_at': volunteer.joined_at.isoformat(),
        'skills': volunteer.skills,
        'availability': volunteer.availability,
        'user_id': volunteer.user_id
    }), 201

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['PUT'])
@jwt_required()
def update_volunteer(volunteer_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    
    if volunteer.user_id != current_user_id and not current_user.is_admin():
        return jsonify({"error": "Access denied"}), 403
    
    data = request.get_json()
    
    if 'name' in data:
        volunteer.name = data['name']
    if 'phone' in data:
        volunteer.phone = data['phone']
    if 'skills' in data:
        volunteer.skills = data['skills']
    if 'availability' in data:
        volunteer.availability = data['availability']
    
    db.session.commit()
    return jsonify({"message": "Volunteer profile updated successfully"})

@volunteers_bp.route('/volunteers/<int:volunteer_id>', methods=['DELETE'])
@jwt_required()
def delete_volunteer(volunteer_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    volunteer = Volunteer.query.get_or_404(volunteer_id)
    
    if volunteer.user_id != current_user_id and not current_user.is_admin():
        return jsonify({"error": "Access denied"}), 403
    
    db.session.delete(volunteer)
    db.session.commit()
    return jsonify({"message": "Volunteer profile deleted successfully"})
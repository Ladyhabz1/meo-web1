from flask import Blueprint, request, jsonify
from models import Donation, db
from flask_jwt_extended import jwt_required, get_jwt_identity

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/donations', methods=['GET'])
@jwt_required()
def get_donations():
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    if current_user.is_admin():
        donations = Donation.query.all()
    else:
        donations = Donation.query.filter_by(user_id=current_user_id).all()
    
    return jsonify([{
        'id': donation.id,
        'donor_name': donation.donor_name,
        'phone_number': donation.phone_number,
        'amount': donation.amount,
        'status': donation.status,
        'transaction_id': donation.transaction_id,
        'created_at': donation.created_at.isoformat(),
        'user_id': donation.user_id,
        'program_id': donation.program_id
    } for donation in donations])

@donations_bp.route('/donations/<int:donation_id>', methods=['GET'])
@jwt_required()
def get_donation(donation_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    donation = Donation.query.get_or_404(donation_id)
    
    if not current_user.is_admin() and donation.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    return jsonify({
        'id': donation.id,
        'donor_name': donation.donor_name,
        'phone_number': donation.phone_number,
        'amount': donation.amount,
        'status': donation.status,
        'transaction_id': donation.transaction_id,
        'created_at': donation.created_at.isoformat(),
        'user_id': donation.user_id,
        'program_id': donation.program_id
    })

@donations_bp.route('/donations', methods=['POST'])
def create_donation():
    data = request.get_json()
    
    donation = Donation(
        donor_name=data['donor_name'],
        phone_number=data['phone_number'],
        amount=data['amount'],
        program_id=data.get('program_id'),
        user_id=data.get('user_id')
    )
    
    if not donation.validate_phone_number():
        return jsonify({"error": "Invalid phone number format"}), 400
    
    db.session.add(donation)
    db.session.commit()
    
    # Here you would typically integrate with M-Pesa API
    # For now, we'll simulate a successful payment
    donation.status = "success"
    donation.transaction_id = f"MPESA_{donation.id}_{donation.created_at.strftime('%Y%m%d%H%M%S')}"
    db.session.commit()
    
    return jsonify({
        'id': donation.id,
        'donor_name': donation.donor_name,
        'phone_number': donation.phone_number,
        'amount': donation.amount,
        'status': donation.status,
        'transaction_id': donation.transaction_id,
        'created_at': donation.created_at.isoformat(),
        'user_id': donation.user_id,
        'program_id': donation.program_id
    }), 201

@donations_bp.route('/donations/<int:donation_id>/status', methods=['PUT'])
@jwt_required()
def update_donation_status(donation_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin():
        return jsonify({"error": "Admin access required"}), 403
    
    donation = Donation.query.get_or_404(donation_id)
    data = request.get_json()
    
    if 'status' in data:
        donation.status = data['status']
    if 'transaction_id' in data:
        donation.transaction_id = data['transaction_id']
    
    db.session.commit()
    return jsonify({"message": "Donation status updated successfully"})
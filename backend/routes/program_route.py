from flask import Blueprint, request, jsonify
from models import Program, db
from flask_jwt_extended import jwt_required, get_jwt_identity

programs_bp = Blueprint('programs', __name__)

@programs_bp.route('/programs', methods=['GET'])
def get_programs():
    programs = Program.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': program.id,
        'title': program.title,
        'description': program.description,
        'start_date': program.start_date.isoformat() if program.start_date else None,
        'end_date': program.end_date.isoformat() if program.end_date else None,
        'created_at': program.created_at.isoformat()
    } for program in programs])

@programs_bp.route('/programs/<int:program_id>', methods=['GET'])
def get_program(program_id):
    program = Program.query.get_or_404(program_id)
    return jsonify({
        'id': program.id,
        'title': program.title,
        'description': program.description,
        'start_date': program.start_date.isoformat() if program.start_date else None,
        'end_date': program.end_date.isoformat() if program.end_date else None,
        'created_at': program.created_at.isoformat()
    })

@programs_bp.route('/programs', methods=['POST'])
@jwt_required()
def create_program():
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin():
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    program = Program(
        title=data['title'],
        description=data['description'],
        start_date=data.get('start_date'),
        end_date=data.get('end_date')
    )
    
    db.session.add(program)
    db.session.commit()
    
    return jsonify({
        'id': program.id,
        'title': program.title,
        'description': program.description,
        'start_date': program.start_date.isoformat() if program.start_date else None,
        'end_date': program.end_date.isoformat() if program.end_date else None,
        'created_at': program.created_at.isoformat()
    }), 201

@programs_bp.route('/programs/<int:program_id>', methods=['PUT'])
@jwt_required()
def update_program(program_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin():
        return jsonify({"error": "Admin access required"}), 403
    
    program = Program.query.get_or_404(program_id)
    data = request.get_json()
    
    if 'title' in data:
        program.title = data['title']
    if 'description' in data:
        program.description = data['description']
    if 'start_date' in data:
        program.start_date = data['start_date']
    if 'end_date' in data:
        program.end_date = data['end_date']
    if 'is_active' in data:
        program.is_active = data['is_active']
    
    db.session.commit()
    return jsonify({"message": "Program updated successfully"})

@programs_bp.route('/programs/<int:program_id>', methods=['DELETE'])
@jwt_required()
def delete_program(program_id):
    current_user_id = get_jwt_identity()
    from models import User
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin():
        return jsonify({"error": "Admin access required"}), 403
    
    program = Program.query.get_or_404(program_id)
    program.is_active = False
    db.session.commit()
    return jsonify({"message": "Program deleted successfully"})
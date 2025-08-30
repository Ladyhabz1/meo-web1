from flask import Blueprint, request, jsonify
from models import Program, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

programs_bp = Blueprint('programs', __name__)

@programs_bp.route('/programs', methods=['GET'])
def get_programs():
    programs = Program.query.filter_by().all()
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
    try:
        current_user_id = get_jwt_identity()
        from models import User, Program
        current_user = User.query.get(current_user_id)
        
        # Admin check
        if not current_user or current_user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        
        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data:
            return jsonify({"error": "Title and description are required"}), 400

        # Convert date strings to datetime objects
        start_date = datetime.strptime(data['start_date'], "%Y-%m-%d") if 'start_date' in data else None
        end_date = datetime.strptime(data['end_date'], "%Y-%m-%d") if 'end_date' in data else None

        program = Program(
            title=data['title'],
            description=data['description'],
            start_date=start_date,
            end_date=end_date
        )
        
        db.session.add(program)
        db.session.commit()
        
        return jsonify({
            'id': program.id,
            'title': program.title,
            'description': program.description,
            'start_date': program.start_date.isoformat() if program.start_date else None,
            'end_date': program.end_date.isoformat() if program.end_date else None,
            'created_at': program.created_at.isoformat() if program.created_at else None
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@programs_bp.route('/programs/<int:program_id>', methods=['PUT'])
@jwt_required()
def update_program(program_id):
    try:
        current_user_id = get_jwt_identity()
        from models import User, Program
        current_user = User.query.get(current_user_id)
        
        # Direct admin check
        if not current_user or current_user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        
        program = Program.query.get_or_404(program_id)
        data = request.get_json()
        
        if 'title' in data:
            program.title = data['title']
        if 'description' in data:
            program.description = data['description']
        if 'start_date' in data:
            program.start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
        if 'end_date' in data:
            program.end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")
        if 'is_active' in data:
            program.is_active = data['is_active']
        
        db.session.commit()
        return jsonify({"message": "Program updated successfully"})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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
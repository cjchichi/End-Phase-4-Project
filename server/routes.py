from flask import Blueprint, request, jsonify
from models import User, StudyGroup, GroupMembership
from schemas import UserSchema, StudyGroupSchema, GroupMembershipSchema
from extensions import db, ma, bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token


api_bp = Blueprint('api', __name__, url_prefix='/api')

user_schema = UserSchema()
group_schema = StudyGroupSchema()
membership_schema = GroupMembershipSchema()

group_list_schema = StudyGroupSchema(many=True)
memberships_schema = GroupMembershipSchema(many=True)

# USERS
@api_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)

    db.session.add(user)
    db.session.commit()
    return jsonify(user_schema.dump(user)), 201

@api_bp.route('/users/count', methods=['GET'])
def count_users():
    count = User.query.count()
    return jsonify({'count': count})

# @api_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')
    
#     user = User.query.filter_by(email=data['email']).first()

#     if user and bcrypt.check_password_hash(user.password_hash, data['password']):
#         access_token = create_access_token(identity=user.id)
#         return jsonify({
#             "message": "Login successful",
#             "access_token": access_token,
#             "user_id": user.id
#         })

#     return jsonify({"message": "Invalid credentials"}), 401

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Registration successful",
        "access_token": access_token,
        "user_id": user.id
    }), 201


@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    print("Login data:", data)  # Debug

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    print("User found:", user)  # Debug

    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user_id": user.id
        })

    return jsonify({"message": "Invalid credentials"}), 401

@api_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Access granted for user {user_id}"})

@api_bp.route('/users/<int:id>/memberships')
def user_memberships(id):
    memberships = GroupMembership.query.filter_by(user_id=id).all()
    return jsonify(memberships_schema.dump(memberships))

@api_bp.route('/users/<int:id>/groups')
def user_groups(id):
    user = User.query.get_or_404(id)
    groups = [m.study_group for m in user.memberships]
    return jsonify(group_list_schema.dump(groups))

#  GROUPS 
@api_bp.route('/groups', methods=['GET'])
def get_groups():
    groups = StudyGroup.query.all()
    return jsonify(group_list_schema.dump(groups))

@api_bp.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    group = StudyGroup(name=data['name'], description=data['description'], creator_id=data['creator_id'])
    db.session.add(group)
    db.session.commit()
    return jsonify(group_schema.dump(group)), 201

@api_bp.route('/groups/<int:id>', methods=['GET'])
def get_group(id):
    group = StudyGroup.query.get_or_404(id)
    return jsonify(group_schema.dump(group))

@api_bp.route('/groups/<int:id>', methods=['PUT'])
def update_group(id):
    data = request.json
    group = StudyGroup.query.get_or_404(id)
    group.name = data['name']
    group.description = data['description']
    db.session.commit()
    return jsonify(group_schema.dump(group))

@api_bp.route('/groups/<int:id>', methods=['DELETE'])
def delete_group(id):
    group = StudyGroup.query.get_or_404(id)
    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "Group deleted"})

@api_bp.route('/groups/<int:id>/users', methods=['GET'])
def group_members(id):
    memberships = GroupMembership.query.filter_by(study_group_id=id).all()
    user_ids = [m.user_id for m in memberships]
    users = User.query.filter(User.id.in_(user_ids)).all()
    return jsonify(UserSchema(many=True).dump(users))

# MEMBERSHIPS 
@api_bp.route('/memberships', methods=['POST'])
def create_membership():
    data = request.json
    membership = GroupMembership(
        user_id=data['user_id'],
        study_group_id=data['study_group_id'],
        role=data['role']
    )
    db.session.add(membership)
    db.session.commit()
    return jsonify(membership_schema.dump(membership)), 201

@api_bp.route('/memberships/<int:id>', methods=['DELETE'])
def leave_group(id):
    membership = GroupMembership.query.get_or_404(id)
    db.session.delete(membership)
    db.session.commit()
    return jsonify({'message': 'Left group'})

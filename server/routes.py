# from flask import Blueprint, request, jsonify
# from server.models import User, StudyGroup, GroupMembership
# from server.schemas import UserSchema, StudyGroupSchema, GroupMembershipSchema
# from server.extensions import db, ma, bcrypt
# from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token


# api_bp = Blueprint('api', __name__, url_prefix='/api')

# user_schema = UserSchema()
# group_schema = StudyGroupSchema()
# membership_schema = GroupMembershipSchema()

# group_list_schema = StudyGroupSchema(many=True)
# memberships_schema = GroupMembershipSchema(many=True)

# # USERS
# @api_bp.route('/users', methods=['POST'])
# def create_user():
#     data = request.json
#     if User.query.filter_by(username=data['username']).first():
#         return jsonify({"error": "Username already exists"}), 400
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "Email already exists"}), 400

#     hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)

#     db.session.add(user)
#     db.session.commit()
#     return jsonify(user_schema.dump(user)), 201

# @api_bp.route('/users/count', methods=['GET'])
# def count_users():
#     count = User.query.count()
#     return jsonify({'count': count})


# @api_bp.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     if User.query.filter_by(username=data['username']).first():
#         return jsonify({"error": "Username already exists"}), 400
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "Email already exists"}), 400

#     hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)

#     db.session.add(user)
#     db.session.commit()

#     access_token = create_access_token(identity=user.id)

#     return jsonify({
#         "message": "Registration successful",
#         "access_token": access_token,
#         "user_id": user.id
#     }), 201


# @api_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     print("Login data:", data)  

#     email = data.get('email')
#     password = data.get('password')

#     user = User.query.filter_by(email=email).first()
#     print("User found:", user)  

#     if user and bcrypt.check_password_hash(user.password_hash, password):
#         access_token = create_access_token(identity=user.id)
#         return jsonify({
#             "message": "Login successful",
#             "access_token": access_token,
#             "user_id": user.id
#         })

#     return jsonify({"message": "Invalid credentials"}), 401

# @api_bp.route('/protected', methods=['GET'])
# @jwt_required()
# def protected_route():
#     user_id = get_jwt_identity()
#     return jsonify({"message": f"Access granted for user {user_id}"})

# @api_bp.route('/users/<int:id>/memberships')
# def user_memberships(id):
#     memberships = GroupMembership.query.filter_by(user_id=id).all()
#     return jsonify(memberships_schema.dump(memberships))

# @api_bp.route('/users/<int:id>/groups')
# def user_groups(id):
#     user = User.query.get_or_404(id)
#     groups = [m.study_group for m in user.memberships]
#     return jsonify(group_list_schema.dump(groups))

# #  GROUPS 
# @api_bp.route('/groups', methods=['GET'])
# def get_groups():
#     groups = StudyGroup.query.all()
#     return jsonify(group_list_schema.dump(groups))

# @api_bp.route('/groups', methods=['POST'])
# def create_group():
#     data = request.json
#     group = StudyGroup(name=data['name'], description=data['description'], creator_id=data['creator_id'])
#     db.session.add(group)
#     db.session.commit()
#     return jsonify(group_schema.dump(group)), 201

# @api_bp.route('/groups/<int:id>', methods=['GET'])
# def get_group(id):
#     group = StudyGroup.query.get_or_404(id)
#     return jsonify(group_schema.dump(group))

# @api_bp.route('/groups/<int:id>', methods=['PUT'])
# def update_group(id):
#     data = request.json
#     group = StudyGroup.query.get_or_404(id)
#     group.name = data['name']
#     group.description = data['description']
#     db.session.commit()
#     return jsonify(group_schema.dump(group))

# @api_bp.route('/groups/<int:id>', methods=['DELETE'])
# def delete_group(id):
#     group = StudyGroup.query.get_or_404(id)
#     db.session.delete(group)
#     db.session.commit()
#     return jsonify({"message": "Group deleted"})

# @api_bp.route('/groups/<int:id>/users', methods=['GET'])
# def group_members(id):
#     memberships = GroupMembership.query.filter_by(study_group_id=id).all()
#     user_ids = [m.user_id for m in memberships]
#     users = User.query.filter(User.id.in_(user_ids)).all()
#     return jsonify(UserSchema(many=True).dump(users))

# @api_bp.route('/groups/search')
# def search_groups():
#     category = request.args.get('category')
#     is_private = request.args.get('private')

#     query = StudyGroup.query
#     if category:
#         query = query.filter_by(category=category)
#     if is_private is not None:
#         query = query.filter_by(is_private=(is_private.lower() == 'true'))

#     return jsonify(group_list_schema.dump(query.all()))

# # MEMBERSHIPS 
# # @api_bp.route('/memberships', methods=['POST'])
# # def create_membership():
# #     data = request.json
# #     membership = GroupMembership(
# #         user_id=data['user_id'],
# #         study_group_id=data['study_group_id'],
# #         role=data['role']
# #     )
# #     db.session.add(membership)
# #     db.session.commit()
# #     return jsonify(membership_schema.dump(membership)), 201


# @api_bp.route('/memberships', methods=['POST'])
# def create_membership():
#     data = request.json

#     existing = GroupMembership.query.filter_by(
#         user_id=data['user_id'],
#         study_group_id=data['study_group_id']
#     ).first()

#     if existing:
#         return jsonify({"error": "User is already a member of this group"}), 400

#     membership = GroupMembership(
#         user_id=data['user_id'],
#         study_group_id=data['study_group_id'],
#         role=data['role']
#     )
#     db.session.add(membership)
#     db.session.commit()
#     return jsonify(membership_schema.dump(membership)), 201

# @api_bp.route('/memberships/<int:id>', methods=['DELETE'])
# def leave_group(id):
#     membership = GroupMembership.query.get_or_404(id)
#     db.session.delete(membership)
#     db.session.commit()
#     return jsonify({'message': 'Left group'})


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
    print("Login data:", data)  

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    print("User found:", user)  

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

@api_bp.route('/my-groups', methods=['GET'])
@jwt_required()
def my_groups():
    user_id = get_jwt_identity()
    memberships = GroupMembership.query.filter_by(user_id=user_id).all()
    groups = [m.study_group for m in memberships]
    return jsonify(group_list_schema.dump(groups))


#  GROUPS 
@api_bp.route('/groups', methods=['GET'])
def get_groups():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    sort_by = request.args.get('sort_by', 'id')
    direction = request.args.get('direction', 'asc')

    query = StudyGroup.query
    if direction == 'desc':
        query = query.order_by(db.desc(getattr(StudyGroup, sort_by)))
    else:
        query = query.order_by(db.asc(getattr(StudyGroup, sort_by)))

    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        "groups": group_list_schema.dump(paginated.items),
        "total": paginated.total,
        "pages": paginated.pages,
        "current_page": paginated.page
    })

@api_bp.route('/groups', methods=['POST'])
@jwt_required()
def create_group():
    data = request.json
    user_id = get_jwt_identity()
    group = StudyGroup(name=data['name'], description=data['description'], creator_id=user_id)
    db.session.add(group)
    db.session.commit()
    return jsonify(group_schema.dump(group)), 201

# @api_bp.route('/groups/<int:id>', methods=['GET'])
# def get_group(id):
#     group = StudyGroup.query.get_or_404(id)
#     return jsonify(group_schema.dump(group))

@api_bp.route('/groups/<int:id>', methods=['GET', 'PUT'])
@jwt_required()
def get_or_update_group(id):
    group = StudyGroup.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(group_schema.dump(group))
        
    user_id = get_jwt_identity()
    if not user_id or group.creator_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    group.name = data['name']
    group.description = data['description']
    db.session.commit()

    return jsonify(group_schema.dump(group))

@api_bp.route('/groups/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_group(id):
    user_id = get_jwt_identity()
    group = StudyGroup.query.get_or_404(id)
    if group.creator_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "Group deleted"})

@api_bp.route('/groups/<int:id>/users', methods=['GET'])
def group_members(id):
    memberships = GroupMembership.query.filter_by(study_group_id=id).all()
    user_ids = [m.user_id for m in memberships]
    users = User.query.filter(User.id.in_(user_ids)).all()
    return jsonify(UserSchema(many=True).dump(users))

@api_bp.route('/groups/search')
def search_groups():
    category = request.args.get('category')
    is_private = request.args.get('private')

    query = StudyGroup.query
    if category:
        query = query.filter_by(category=category)
    if is_private is not None:
        query = query.filter_by(is_private=(is_private.lower() == 'true'))

    return jsonify(group_list_schema.dump(query.all()))

# MEMBERSHIPS 
@api_bp.route('/memberships', methods=['POST'])
@jwt_required()
def create_membership():
    user_id =get_jwt_identity()
    data = request.json
    
    existing = GroupMembership.query.filter_by(
        user_id=user_id,
        study_group_id=data['study_group_id']
    ).first()

    if existing:
        return jsonify({"error": "User  is already a member of this group"}), 400

    membership = GroupMembership(
        user_id=user_id,
        study_group_id=data['study_group_id'],
        role=data['role']
    )
    db.session.add(membership)
    db.session.commit()
    return jsonify(membership_schema.dump(membership)), 201

@api_bp.route('/memberships/<int:id>', methods=['DELETE'])
@jwt_required()
def leave_group(id):
    user_id = get_jwt_identity()
    membership = GroupMembership.query.get_or_404(id)

    if membership.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    db.session.delete(membership)
    db.session.commit()
    return jsonify({'message': 'Left group'})

@api_bp.route('/memberships/<int:id>', methods=['PUT'])
@jwt_required()
def update_membership(id):
    data = request.json
    membership = GroupMembership.query.get_or_404(id)
    if get_jwt_identity() != membership.study_group.creator_id:
        return jsonify({"error": "Only group creator can update roles"}), 403

    membership.role = data.get('role', membership.role)
    db.session.commit()

    return jsonify(membership_schema.dump(membership))

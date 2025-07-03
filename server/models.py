from server.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    groups_created = db.relationship('StudyGroup', backref='creator', lazy=True)
    memberships = db.relationship('GroupMembership', back_populates='user')

class StudyGroup(db.Model):
    __tablename__ = 'study_groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255))
    location = db.Column(db.String)  
    meeting_time = db.Column(db.String)  
    max_members = db.Column(db.Integer)
    category = db.Column(db.String(80))
    meeting_link = db.Column(db.String(255))
    is_private = db.Column(db.Boolean, default=False)

    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    memberships = db.relationship('GroupMembership', back_populates='study_group')

class GroupMembership(db.Model):
    __tablename__ = 'group_memberships'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    study_group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'))
    role = db.Column(db.String(50))
    user = db.relationship('User', back_populates='memberships')
    study_group = db.relationship('StudyGroup', back_populates='memberships')
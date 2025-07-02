from app import ma
from models import User, StudyGroup, GroupMembership
from marshmallow_sqlalchemy import SQLAlchemySchema
class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
    id = ma.auto_field()
    username = ma.auto_field()
    email = ma.auto_field()

class StudyGroupSchema(SQLAlchemySchema):
    class Meta:
        model = StudyGroup
    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()
    creator_id = ma.auto_field()

class GroupMembershipSchema(SQLAlchemySchema):
    class Meta:
        model = GroupMembership
    id = ma.auto_field()
    user_id = ma.auto_field()
    study_group_id = ma.auto_field()
    role = ma.auto_field()
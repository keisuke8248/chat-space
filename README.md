## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|password|integer|null: false|
|mail|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :user_groupes
- has_many :users, through: :user_groups
- has_many :comments

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

### commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

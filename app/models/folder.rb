class Folder < ApplicationRecord
  validates_presence_of :name
  has_many_attached :files
  belongs_to :parent, class_name: 'Folder'
  has_many :subfolders, foreign_key: :parent_id, class_name: 'Folder', dependent: :destroy
end

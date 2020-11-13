class FoldersController < ApplicationController
  before_action :set_folder, only: [:show, :edit, :update, :destroy, :new_file]
  before_action :load_parents, only: [:show]

  def index
    @folders = Folder.where(parent_id: nil)
  end

  def show
    @subfolders = Folder.where(parent: @folder)
  end

  def new
    @folder = Folder.new
  end

  def new_file
  end

  def edit
  end

  def create
    @folder = Folder.new(folder_params)
    if @folder.save
      redirect_to @folder.parent_id.present? ? @folder.parent : folders_url, notice: 'Diretório criado com sucesso'
    else
      render :new
    end
  end

  def update
    if @folder.update(files_params)
      redirect_to @folder, notice: 'Diretório atualizado com sucesso'
    else
      render :edit
    end
  end

  def remove_file
    @folder = Folder.find(params[:folder_id])
    if att_file = ActiveStorage::Attachment.find_by(id: params[:id], record_type: 'Folder', record_id: params[:folder_id])
      att_file.purge
      redirect_to @folder, notice: 'Arquivo removido com sucesso'
    else
      redirect_to @folder, notice: 'Falha ao remover arquivo'
    end
  end

  def destroy
    @folder.destroy
    redirect_to @folder.parent_id.present? ? @folder.parent : folders_url, notice: 'Diretório excluído com sucesso'
  end

  private
    def set_folder
      @folder = Folder.find(params[:id])
    rescue
      redirect_to folders_path, notice: 'Diretório não encontrado'
    end

    def load_parents
      @parents = [@folder]
      set_parent(@folder)
      @parents.reverse!
    end

    def set_parent(folder)
      if folder.parent.present?
        @parents.push(folder.parent)
        set_parent(folder.parent)
      end
    end

    def folder_params
      params.require(:folder).permit(:name, :parent_id)
    end

    def files_params
      params.require(:folder).permit(:name, files: [])
    end
end

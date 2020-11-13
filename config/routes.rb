Rails.application.routes.draw do
  resources :folders do
    get :new_file, on: :member
    delete :remove_file, on: :member
  end
  root 'folders#index'
end

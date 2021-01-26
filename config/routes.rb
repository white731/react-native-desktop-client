Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get "things", to: "things#index"
    put "like/:things_id", to: "things#likes"
    post "things", to: "things#create"
    delete "things/:things_id", to: "things#destroy"
  end
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get "things", to: "things#index"
    put "likes/:things_id", to: "things#likes"
  end
end

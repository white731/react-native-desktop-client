class Api::ThingsController < ApplicationController

  def index
    render json: Thing.all.order(likes: :desc)
  end

  def likes
    thing = Thing.find(params[:things_id])
    thing.update(likes: thing.likes + 1)
    render json: thing
  end
end

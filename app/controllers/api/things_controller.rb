class Api::ThingsController < ApplicationController

  def index
    render json: Thing.all.order(likes: :desc)
  end

  def likes
    thing = Thing.find(params[:things_id])
    thing.update(likes: thing.likes + 1)
    render json: thing
  end

  def create
    puts params
    thing = Thing.create(name: params[:name], likes: 0)
    render json: thing
  end

  def destroy
    render json: Thing.find(params[:thing_id]).destroy
  end
end

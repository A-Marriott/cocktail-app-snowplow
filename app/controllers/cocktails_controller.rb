require 'snowplow-tracker'

class CocktailsController < ApplicationController
  def index
    @cocktails = Cocktail.all
    emitter = SnowplowTracker::Emitter.new("http://localhost:9090/micro/all")
    tracker = SnowplowTracker::Tracker.new(emitter)
  end

  def show
    @cocktail = Cocktail.find(params[:id])
  end

  def new
    @cocktail = Cocktail.new
  end

  def create
    @cocktail = Cocktail.new(cocktail_params)
    # @cocktail.image.key = require '../assets/images/empty_glass.jpg' unless @cocktail.image.attached?
    # @cocktail.image.key = image_tag('empty_glass.png') unless @cocktail.image.attached?
    if @cocktail.save
      redirect_to cocktail_path(@cocktail)
    else
      render :new
    end
  end

  private

  def cocktail_params
    params.require(:cocktail).permit(:name, :image)
  end
end

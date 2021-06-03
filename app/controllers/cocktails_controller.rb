class CocktailsController < ApplicationController
  def index
    @cocktails = Cocktail.all
  end

  def show
    @cocktail = Cocktail.find(params[:id])
  end

  def new
    @cocktail = Cocktail.new
  end

  def create
    @images = [
      'https://bit.ly/3g0Wd2w',
      'https://bit.ly/2RlSdRW',
      'https://bit.ly/3ifOv7A',
      'https://bit.ly/2SYxswc',
      'https://bit.ly/3fJAJs2'
    ]
    @cocktail = Cocktail.new(cocktail_params)
    @cocktail.random_image = @images.sample
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

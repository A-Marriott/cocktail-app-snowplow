class AddRandomimageToCocktails < ActiveRecord::Migration[6.0]
  def change
    add_column :cocktails, :random_image, :string
  end
end

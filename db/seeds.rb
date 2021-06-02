# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'json'

puts "deleting DB"
Ingredient.destroy_all

puts "creating seeds"

15.times do
  url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  drink_info = JSON.parse(open(url).read)["drinks"][0]
  array = [drink_info['strIngredient1'], drink_info['strIngredient2']].sample
  unless Ingredient.find_by name: "#{array}"
    Ingredient.create!(name: array)
  end
end

puts "done"

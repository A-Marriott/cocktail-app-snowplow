# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'
require 'json'

puts 'deleting data'

Dose.destroy_all
Ingredient.destroy_all
Cocktail.destroy_all

puts 'creating seed'

ingredient_list = [
  'Chocolate liqueur',
  'Baileys Irish cream',
  'Bourbon',
  'White rum',
  'Gin',
  'Banana',
  'Sugar',
  'Honey',
  'Coke',
  'Seltzer'
]

ingredient_list.each do |ingredient|
  Ingredient.create(name: ingredient)
end

Cocktail.create(name: 'Virgin Strawberry Daiquiri')
Cocktail.create(name: 'Mojito')

puts "done"

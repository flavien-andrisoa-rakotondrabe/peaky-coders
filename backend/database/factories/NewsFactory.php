<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<News>
 */
class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition(): array
    {
        return [
            'user_id'       => User::factory(),
            'type'          => fake()->randomElement(['evenement', 'divers']),
            'date'          => fake()->date('Y-m-d'),
            'title'         => fake()->sentence(6),
            'description'   => fake()->paragraph(),
            'images'        => null,
            'latitude'      => null,
            'longitude'     => null,
            'location_name' => null,
        ];
    }

    public function evenement(): static
    {
        return $this->state([
            'type'          => 'evenement',
            'latitude'      => fake()->latitude(),
            'longitude'     => fake()->longitude(),
            'location_name' => fake()->city(),
        ]);
    }
}

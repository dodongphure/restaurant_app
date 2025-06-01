import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  imports: [CommonModule],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  async loadRestaurants(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      this.restaurants = await this.restaurantService.getRestaurants();
    } catch (err: any) {
      this.error = `Failed to load restaurants: ${err.message || 'Unknown error'}`;
      console.error('Error loading restaurants:', err);
    } finally {
      this.isLoading = false;
    }
  }
}

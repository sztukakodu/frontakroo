import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {Book} from "./book";
import {HttpErrorResponse} from "@angular/common/http";
import {CartItem} from "./cartItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontakroo';
  public catalog: Book[];
  public cartItems: CartItem[] = [];

  constructor(private catalogService: CatalogService) {}

  public getCatalog(): void {
    this.catalogService.getCatalog().subscribe(
      (response: Book[]) => {
        console.log("Got book list:");
        console.log(response);
        this.catalog = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  public addToCart(book: Book): void {
    const current: CartItem = this.cartItems.find(x => x.bookId === book.id);
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItems.push({bookId: book.id, quantity: 1} as CartItem);
    }
    console.log('Cart is: ' + JSON.stringify(this.cartItems));
  }

  public countCartItems(): number {
    return this.cartItems
      .reduce((sum, current) => sum + current.quantity, 0);
  }

  ngOnInit(): void {
    this.getCatalog();
  }
}

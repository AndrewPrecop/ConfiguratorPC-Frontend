import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Piece } from '../shared/piece.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  pieces: Piece[] ;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.pieces = this.slService.getPieces();
    this.subscription = this.slService.piecesChanged
      .subscribe(
        (pieces: Piece[]) => {
          this.pieces = pieces;
        }
      );
  }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}


import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { ApiService } from 'src/app/services/api.service';

// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'gallery',
  template: `<div class="gallery-root">
    <button type="button" class="btn btn-primary btn-lg" routerLink="/">
      Home
    </button>
    <!-- <button type="button" class="btn btn-primary btn-lg" routerLink="gallery">Gallery</button> -->
    <h1 class="title">Image Gallery</h1>
    <swiper
      [navigation]="true"
      class="mySwiper"
      [spaceBetween]="50"
      (swiper)="onSwiper($event)"
      (slideChange)="onSlideChange()"
    >
      <ng-template *ngFor="let nft of nftCollection" swiperSlide
        ><img
          src="{{ nft.image || '../assets/images/cat.jpeg' }}"
          alt="{{ nft.name }}"
      /></ng-template>
    </swiper>
  </div>`,
  // styleUrls: ["./app.components.scss"],
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements OnInit {
  INITIAL_CONTENTS = [
    {
      key: '0',
      name: 'Goat of American Football',
      image: '',
    },
    {
      key: '1',
      name: 'Goat of Basketball',
      image: '',
    },
    {
      key: '2',
      name: 'Goat of Chess',
      image: '',
    },
    {
      key: '3',
      name: 'Goat of Football',
      image: '',
    },
    {
      key: '4',
      name: 'Goat of Free Solo',
      image: '',
    },
    {
      key: '5',
      name: 'Goat of MMA',
      image: '',
    },
    {
      key: '6',
      name: 'Goat of Rock Climbing',
      image: '',
    },
    {
      key: '7',
      name: 'Goat of Strength',
      image: '',
    },
    {
      key: '8',
      name: 'Goat of Swimming',
      image: '',
    },
    {
      key: '9',
      name: 'Goat of Tennis',
      image: '',
    },
  ];

  nftCollection: { key: string; name: string; image: string }[] = [];
  config: SwiperOptions = {
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.nftCollection = this.INITIAL_CONTENTS;
    this.getNFTs();
  }
  onSwiper(swiper: Event) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  private getNFTData(index: number) {
    this.apiService.getNFTURI(index).then((result: any) => {
      if (Object.keys(result).length >= 0) {
        this.nftCollection[index] = {
          key: String(index),
          name: result.name,
          image: `https://ipfs.io/ipfs/${result.hash}?filename=${result.name}.jpg`,
        };
      }
    });
  }

  private getNFTs() {
    let nftCollectionLength = 0;
    this.apiService.getNFTCollection().subscribe((result: any) => {
      nftCollectionLength = Object.keys(result).length;
      for (let i = 0; i < nftCollectionLength; i++) {
        this.getNFTData(i);
      }
    });
  }
}

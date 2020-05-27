import { Component, NgModule, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
(['./app.component.css'])

import {
  AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy, GalleryService,
  DotsConfig, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name: string;

  constructor(private galleryService: GalleryService) {
    this.name = `${VERSION.full}`
  }

  imageIndex = 1;
  galleryId = 1;

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  plainGalleryRow: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true }, 'flex-start')
  };

  images: Image[] = [
    new Image(
      0,
      { 
        img: 'assets/imgs/forest0.jpg',
        description: 'Description 1'
      }
    ),
    new Image(
      1,
      {
        img: 'assets/imgs/forest1.jpg',
        description: 'Description 2'
      }
    ),
    new Image(
      2,
      { 
        img: 'assets/imgs/forest2.jpg',
        description: 'Description 3'
      }
    ),
    new Image(
      3,
      { 
        img: 'assets/imgs/forest3.jpg',
        description: 'Description 4'
      }
    ),
    new Image(
      4,
      { 
        img: 'assets/imgs/forest4.jpg',
        description: 'Description 5'
      }
    ),
    new Image(
      5,
      { 
        img: 'assets/imgs/forest5.jpg',
        description: 'Description 6'
      }
    ),
    new Image(
      6,
      {
        img: 'assets/imgs/forest6.jpg',
        description: 'Description 7'
      }
    ),
    new Image(
      7,
      {
        img: 'assets/imgs/forest7.jpg',
        description: 'Description 8'
      }
    ),
    new Image(
      8,
      { 
        img: 'assets/imgs/forest8.jpg',
        description: 'Description 9'
      }
    ),
    new Image(
      9,
      {
        img: 'assets/imgs/forest9.jpg',
        description: 'Description 10'
      }
    ),
    new Image(
      10,
      { 
        img: 'assets/imgs/forest10.jpg',
        description: 'Description 11'
      }
    ),
    new Image(
      11,
      { 
        img: 'assets/imgs/forest11.jpg',
        description: 'Description 12'
      }
    ),
    new Image(
      12,
      { 
        img: 'assets/imgs/forest12.jpg',
        description: 'Description 13'
      }
    ),
    new Image(
      13,
      {
        img: 'assets/imgs/forest13.jpg',
        description: 'Description 14'
      }
    ),
    new Image(
      14,
      {
        img: 'assets/imgs/forest14.jpg',
        description: 'Description 15'
      }
    ),
  ];

  customButtons: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      {
        className: 'delete-image',
        type: ButtonType.DELETE
      },
      {
        className: 'close-image',
        type: ButtonType.CLOSE
      }
    ]
  };

  openImageModalRow(image: Image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.images);
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(index, true) });
  }

  onButtonBeforeHook(event: ButtonEvent) {
    console.log('onButtonBeforeHook ', event);

    if (!event || !event.button) {
      return;
    }

    if (event.button.type === ButtonType.DELETE) {
      this.images = this.images.filter((val: Image) => event.image && val.id !== event.image.id);
    }
  }

  onSubmit(URL) {
    const newImage: Image = new Image(
      this.images.length,
      { 
        img: URL,
        description: 'Description' + this.images.length
      }
    );
    this.images = [...this.images, newImage];
  }

  onButtonAfterHook(event: ButtonEvent) {
    console.log('onButtonAfterHook ', event);
    if (!event || !event.button) {
      return;
    }
  }

  onCloseImageModal(event: ImageModalEvent) {
    this.customPlainGalleryRowConfig = Object.assign({}, this.customPlainGalleryRowConfig, { layout: new AdvancedLayout(-1, true) });
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(-1, true) });
  }

  private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) {}


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    /* ----------------------------------------------------------------------------------------- */
    // menu
    const coll = this.el.nativeElement.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
      this.renderer.listen(coll[i], 'click', () => {
        coll[i].classList.toggle('active');
        const content = coll[i].nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
    }
    /* ----------------------------------------------------------------------------------------- */
  }
  
}

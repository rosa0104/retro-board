import {Component, OnInit} from '@angular/core';
import {Retro} from '../../model/retro';
import {RetroService} from '../../services/retro.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.css']
})
export class RetroComponent implements OnInit {

  constructor(
    public retroService: RetroService,
    private router: Router
  ) { }

  retro: Retro;

  ngOnInit() {
    this.retroService.getRetrosForCurrentUser();
    this.newRetro();
  }

  selectRetro(retroId: string) {
    this.retroService.setCurrentRetroId(retroId);
    this.router.navigateByUrl('/board');
  }

  onSubmit() {
    this.retroService.createNewRetro(this.retro).subscribe(
      () => {
        this.newRetro();
      }
    );
  }

  newRetro() {
    this.retro = new Retro();
  }
}

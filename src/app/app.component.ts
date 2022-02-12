import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Frontend';
    safeSrc?: SafeResourceUrl;

    constructor(
        private _sanitizer: DomSanitizer
    ) {}
    ngOnInit(): void {}

    public getVideoIframe(videoURL: any) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/; 
        const match = videoURL.match(regExp);
        const getId = (match && match[2].length === 11) ? match[2] : null;
        const videoId = 'https://www.youtube.com/embed/'+getId;
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoId);
    }
}

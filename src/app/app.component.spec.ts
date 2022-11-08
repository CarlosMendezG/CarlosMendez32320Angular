import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';

export class MatDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of({ action: true })
        };
    }
}

describe('AppComponent', () => {



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule, HttpClientModule, BrowserAnimationsModule,
                HttpClientModule
            ],
            declarations: [
                AppComponent

            ],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                }
            ],

        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
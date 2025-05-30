import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DbService } from '@mm-services/db.service';
import { TranslationLoaderProvider } from '@mm-providers/translation-loader.provider';
import { TranslateMessageFormatCompilerProvider } from '@mm-providers/translate-messageformat-compiler.provider';
import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { TranslateService } from '@mm-services/translate.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { LanguageService } from '@mm-services/language.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:
          (db: DbService, languageService: LanguageService) => new TranslationLoaderProvider(db, languageService),
        deps: [DbService, LanguageService],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompilerProvider,
      },
    }),
    AppComponent,
  ]
})
export class AppModule implements DoBootstrap {
  constructor(
    injector: Injector,
    private readonly dbService: DbService,
    private readonly translateService: TranslateService
  ) {
    const chtForm = createCustomElement(AppComponent, { injector });
    customElements.define('cht-form', chtForm);
  }

  ngDoBootstrap() {
    window.CHTCore = {
      AndroidAppLauncher: { isEnabled: () => false },
      Language: { get: async () => 'en' },
      MRDT: { enabled: () => false },
      Select2Search: {
        init: async () => {}
      },
      Settings: { get: async () => ({ default_country_code: '1' }) },
      Translate: this.translateService,
      DB: this.dbService,
    };
  }
}

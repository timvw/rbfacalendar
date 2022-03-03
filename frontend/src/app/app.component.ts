import {Component, ComponentRef, Injector} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {LoaderService} from "./services/loader.service";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {LoaderComponent} from "./components/loader/loader.component";

export class LoadingOverlayRef {
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private loaderRef: LoadingOverlayRef | null = null;

  constructor(
    public loaderService: LoaderService,
    private injector: Injector,
    private overlay: Overlay) {

    this.loaderService.isLoading.subscribe(loading => {
      if(loading && this.loaderRef == null) {
        this.loaderRef = this.open();
      }
      if(!loading && this.loaderRef != null) {
        this.loaderRef.close();
        this.loaderRef = null;
      }
    });
  }

 ngOnInit(): void { }

  open(): LoadingOverlayRef {
    const overlayRef = this.createOverlay();
    const dialogRef = new LoadingOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(overlayRef, dialogRef);
    return dialogRef;
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(overlayRef: OverlayRef, dialogRef: LoadingOverlayRef): LoaderComponent {
    const injector = this.createInjector(dialogRef);
    const containerPortal = new ComponentPortal(LoaderComponent, null, injector);
    const containerRef: ComponentRef<LoaderComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(dialogRef: LoadingOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(LoadingOverlayRef, dialogRef);
    return new PortalInjector(this.injector, injectionTokens);
  }
}

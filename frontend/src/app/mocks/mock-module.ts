import { NgModule } from '@angular/core';
import { MockRbfaService } from "./mock-rbfa.service";
import { RbfaService } from "../services/rbfa.service";

@NgModule({
    providers: [
       { provide: RbfaService, useClass: MockRbfaService }
    ]
 })
 export class MockModule {}
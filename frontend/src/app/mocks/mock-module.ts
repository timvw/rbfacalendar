import { NgModule } from '@angular/core';
import { MockRbfaService } from "./mock-rbfa.service";
import { RbfaService } from "../rbfa.service";

@NgModule({
    providers: [
       { provide: RbfaService, useClass: MockRbfaService }
    ]
 })
 export class MockModule {}
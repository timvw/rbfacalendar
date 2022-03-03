import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Inject } from '@angular/core';
import { RbfaService } from '../../services/rbfa.service';
import { Team } from '../../models/team';
import { ClubTeams } from '../../models/clubteams';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isObjectValidator} from "../../is-object.validator";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [ RbfaService ]
})
export class TeamsComponent implements OnInit {

  form = new FormGroup({
    team: new FormControl('', [Validators.required, isObjectValidator() ]),
  });

  @Input() teams: Team[] = [];

  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.assignData();
  }

  ngOnInit(): void {
    this.assignData();
  }

  getTeams(club_id: string): void {
    this.rbfaService.getTeams(club_id).subscribe((clubTeams: ClubTeams) => this.teams = clubTeams.teams);
  }

  assignData() {

    /*
    if(this.dwhPuddleTemplate != null) {
      let data = this.dwhPuddleTemplate;

      this.piiTypes = data.lookupData.piiTypes.items;
      this.dataTypes = data.lookupData.dataTypes.items;
      this.gdprTypes = data.lookupData.gdprTypes.items;

      this.form.controls['table'].setValue(data.table);

      this.fields.clear();
      for (let field of data.fields) {
        let fieldForm = this._formBuilder.group({
          sourceName: this._formBuilder.control(field.sourceName),
          sourceDataType: this._formBuilder.control(field.sourceDataType),
          sourceNullable: this._formBuilder.control(field.sourceNullable),
          name: this._formBuilder.control(field.name),
          dataType: this._formBuilder.control(field.dataType, Validators.required),
          nullable: this._formBuilder.control(field.nullable, Validators.required),
          piiType: this._formBuilder.control(field.piiType),
        });
        this.fields.push(fieldForm);
      }

      this.form.controls['fileName'].setValue(data.fileName);
      this.form.controls['className'].setValue(data.className);
      this.form.controls['gdprTypes'].setValue(data.gdprTypes);
    }

     */
  }
}

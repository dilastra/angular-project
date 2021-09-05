import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AccountType,
  BeneficiaryService,
  LoaderService,
  ManagerStructure,
  Questionnaire,
  QuestionnaireService,
} from 'src/app/core';

@Component({
  selector: 'credex-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  public questionnaireForm: FormGroup;

  public accountTypes = AccountType;

  public managersStructure = ManagerStructure;

  public companyClientId = '';

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private builder: FormBuilder
  ) {
    this.questionnaireForm = this.builder.group({
      number_employees: 0,
      average_number_employees: null,
      flow_money_per_month: null,
      wage_arrears: null,
      account_type: null,
      bank_bic: null,
      bank_account: null,
      check_bic: false,
      manager_structure: null,
      staff: null,
      registered_usa: false,
      taxpayer_status: false,
      passive_fin_org: false,
      legal_rus: false,
      limited_suppliers: false,
      limited_buyers: false,
      contact_fullname: null,
      contact_email: [null, Validators.email],
      contact_phone: null,
      site: null,
    });
  }

  public ngOnInit(): void {
    this.loader.show();
    this.companyClientId = this.route.snapshot.params.id;

    this.questionnaireService
      .getQuestionnaireClientCompany(this.companyClientId)
      .subscribe(
        (questionnaire: Questionnaire) => {
          this.questionnaireForm.patchValue({
            ...questionnaire,
          });
          this.loader.hide();
        },
        () => {
          this.loader.hide();
        }
      );
  }

  public getNameManagerStructure() {
    const selectedManagerStructure =
      this.getControl('manager_structure')?.value;
    return this.managersStructure[selectedManagerStructure] ?? '';
  }

  public getNameAccountType() {
    const selectedAccountType = this.getControl('account_type')?.value;
    return this.accountTypes[selectedAccountType] ?? '';
  }

  public getControl(nameControl: string): FormControl {
    return this.questionnaireForm.controls[nameControl] as FormControl;
  }

  public onSave() {
    this.loader.show();
    const questionnaire = this.questionnaireForm.value;

    this.questionnaireService
      .updateQuestionnaireClientCompany(this.companyClientId, questionnaire)
      .subscribe(() => {
        this.loader.hide();
      });
  }
}

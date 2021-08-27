import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveBalanceSheetsComponent } from './archive-balance-sheets.component';

describe('ArchiveBalanceSheetsComponent', () => {
  let component: ArchiveBalanceSheetsComponent;
  let fixture: ComponentFixture<ArchiveBalanceSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveBalanceSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveBalanceSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

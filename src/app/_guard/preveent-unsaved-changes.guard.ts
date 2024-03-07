import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preveentUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if(component.editform?.dirty){
    return confirm('Do you really want to leave page?\nAny unsaved changes will be discarded')
  }
  return true;
};

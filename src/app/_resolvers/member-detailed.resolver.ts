import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { Member } from '../_models/member';

export const memberDetailedResolver: ResolveFn<Member> = (route, state) => {
  const memberservice =inject(MembersService);

  return memberservice.getMember(route.paramMap.get('username')!)
};

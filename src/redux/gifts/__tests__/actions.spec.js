import {
  getGiftsByContactFailed,
  getGiftsByContactFetched,
  getGiftsByContactSuccess,
} from '../actions';
import * as types from '../types';

describe('Redux', () => {
  describe('Gifts', () => {
    describe('Actions', () => {
      it('getGiftsByContactFetched', () => {
        expect(getGiftsByContactFetched(3)).toEqual({
          type: types.GET_GIFTS_BY_CONTACT_FETCHED,
          contactId: 3,
        });
      });

      it('getGiftsByContactSuccess', () => {
        const contactId = 5;
        const gifts = ['item2', 'item1'];
        expect(getGiftsByContactSuccess(contactId, gifts)).toEqual({
          type: types.GET_GIFTS_BY_CONTACT_SUCCESS,
          gifts,
          contactId,
        });
      });

      it('getGiftsByContactFailed', () => {
        const error = new Error('My error');
        expect(getGiftsByContactFailed(error)).toEqual({
          type: types.GET_GIFTS_BY_CONTACT_FAILED,
          error,
        });
      });
    });
  });
});

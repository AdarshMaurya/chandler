import {getByContactReducer, giftsReducer} from '../reducer';
import {
  getGiftsByContactSuccess,
  getGiftsByContactFailed,
  getGiftsByContactFetched,
} from '../actions';
// import * as types from '../types';

describe('Redux', () => {
  describe('Gifts', () => {
    describe('Reducer', () => {
      describe('getByContactReducer', () => {
        it('should return the initial state', () => {
          const state = getByContactReducer(undefined, {});

          expect(state).toEqual({
            error: null,
            fetchedPageCount: {},
            isFetching: false,
            lastUpdated: null,
          });
        });

        it('should handle fetched', () => {
          const initialState = getByContactReducer(undefined, {});
          const state = getByContactReducer(
            initialState,
            getGiftsByContactFetched(3),
          );

          expect(state).toEqual({
            ...initialState,
            fetchedPageCount: {3: 1},
            isFetching: true,
          });
        });

        it('should handle success', () => {
          const contactId = 5;
          const gifts = ['a'];
          const initialState = getByContactReducer(undefined, {});
          let state = getByContactReducer(
            initialState,
            getGiftsByContactFetched(contactId),
          );
          state = getByContactReducer(
            state,
            getGiftsByContactSuccess(contactId, gifts),
          );

          expect(state).toEqual({
            ...initialState,
            fetchedPageCount: {
              [contactId]: 1,
            },
            isFetching: false,
            lastUpdated: state.lastUpdated,
          });
        });

        it('should handle failed', () => {
          const contactId = 5;
          const error = new Error();
          const initialState = getByContactReducer(undefined, {});
          let state = getByContactReducer(
            initialState,
            getGiftsByContactFetched(5),
          );
          state = getByContactReducer(state, getGiftsByContactFailed(error));

          expect(state).toEqual({
            ...initialState,
            fetchedPageCount: {
              [contactId]: 1,
            },
            isFetching: false,
            error: error,
          });
        });
      });

      describe('giftsReducer', () => {
        it('should return the initial state', () => {
          const state = giftsReducer(undefined, {});

          expect(state).toEqual({});
        });

        it('should add contacts when success is returned', () => {
          const contactId = 5;
          const gifts = [{id: 1, body: 'a'}, {id: 2, body: 'b'}];
          let state = giftsReducer(undefined, {});
          state = giftsReducer(
            state,
            getGiftsByContactSuccess(contactId, gifts),
          );

          expect(state).toEqual({
            [gifts[0].id]: gifts[0],
            [gifts[1].id]: gifts[1],
          });
        });
      });
    });
  });
});

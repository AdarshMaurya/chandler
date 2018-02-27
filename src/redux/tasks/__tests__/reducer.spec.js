import {getByContactReducer, tasksReducer} from '../reducer';
import {
  getTasksByContactSuccess,
  getTasksByContactFailed,
  getTasksByContactFetched,
} from '../actions';
// import * as types from '../types';

describe('Redux', () => {
  describe('Tasks', () => {
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
          const contactId = 5;
          const initialState = getByContactReducer(undefined, {});
          const state = getByContactReducer(
            initialState,
            getTasksByContactFetched(contactId),
          );

          expect(state).toEqual({
            ...initialState,
            fetchedPageCount: {
              [contactId]: 1,
            },
            isFetching: true,
          });
        });

        it('should handle success', () => {
          const contactId = 5;
          const tasks = ['a'];
          const initialState = getByContactReducer(undefined, {});
          let state = getByContactReducer(
            initialState,
            getTasksByContactFetched(contactId),
          );
          state = getByContactReducer(
            state,
            getTasksByContactSuccess(contactId, tasks),
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
          const contactId = 10;
          const error = new Error();
          const initialState = getByContactReducer(undefined, {});
          let state = getByContactReducer(
            initialState,
            getTasksByContactFetched(contactId),
          );
          state = getByContactReducer(state, getTasksByContactFailed(error));

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

      describe('tasksReducer', () => {
        it('should return the initial state', () => {
          const state = tasksReducer(undefined, {});

          expect(state).toEqual({});
        });

        it('should add contacts when success is returned', () => {
          const contactId = 5;
          const tasks = [{id: 1, body: 'a'}, {id: 2, body: 'b'}];
          let state = tasksReducer(undefined, {});
          state = tasksReducer(
            state,
            getTasksByContactSuccess(contactId, tasks),
          );

          expect(state).toEqual({
            [tasks[0].id]: tasks[0],
            [tasks[1].id]: tasks[1],
          });
        });
      });
    });
  });
});

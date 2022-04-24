import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
    logout,
    user: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function logout() {
    localStorage.removeItem('user');
    currentUserSubject.next(null);
}
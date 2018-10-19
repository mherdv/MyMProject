export class AuthServic{
    private isAuthenticated = false;

    login(){
        this.isAuthenticated = true;
    }

    logOuth(){
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean{
        return this.isAuthenticated;
    }

}
export default function useAuth() {
    try {
        const user: string = JSON.parse(localStorage.getItem("user") || "")
        const userId: string = JSON.parse(localStorage.getItem("userId") || "")
        const email: string = JSON.parse(localStorage.getItem("email") || "")

        return {
            user,
            userId,
            email
        }
    } catch (error) {
        console.log("ERROR FROM USEAUTH", error);
        return {
            user: null,
            userId: null,
            email: null
        }
    }
}
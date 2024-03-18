// fake implementation of signOut
export async function signOut() {
  sessionStorage.removeItem('devContactsToken')
  localStorage.removeItem('devContactsToken')
}

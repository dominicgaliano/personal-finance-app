<script lang="ts">
    import RedirectGuard from "../../components/RedirectGuard.svelte";
    import { handleSubmit } from "./utils";

    // TODO: Investigate, I have no idea how this works
    export let form;

    let email = "";
    let emailError = false;

    let password = "";
    let passwordError = false;

    /**
     * Determines whether to enable the submit button
     *
     * @param email - user email
     * @param password - user password
     * @returns boolean - whether the user input is valid
     */
    function softValidate(email: string, password: string): boolean {
        // TODO: implement more validation and error handling
        if (email.length < 1) {
            emailError = true;
            return false;
        }
        if (password.length < 1) {
            passwordError = true;
            return false;
        }
        return true;
    }

    $: userInputValid = softValidate(email, password);
</script>

<RedirectGuard redirectPath={"/login"}/>
<div class="wrapper">
    <main>
        <h1 class="centered">Reauthenticate to continue</h1>
        <form method="POST" on:submit|preventDefault={handleSubmit}>
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                aria-invalid={emailError}
                aria-describedby={emailError ? "email-error" : null}
                autocomplete="email"
                bind:value={email}
            />
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                aria-invalid={passwordError}
                aria-describedby={passwordError ? "password-error" : null}
                autocomplete="new-password"
                bind:value={password}
            />
            <button
                type="submit"
                class={"danger" + (userInputValid ? "" : " disabled")}
                disabled={!userInputValid}>Confirm Delete Account</button
            >
            <button type="button" on:click={() => window.history.back()}
                >Cancel</button
            >
            {#if form && !form.success && form.message}
                <div class="error-text">
                    {form.message}
                </div>
            {/if}
        </form>
    </main>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    main {
        height: fit-content;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .centered {
        text-align: center;
    }
    form > * {
        display: block;
        margin: 1rem;
    }
    .error-text {
        color: red;
    }
    .danger {
        background-color: #ff0000;
        border: none;
        border-radius: 0.25rem;
        color: #ffffff;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
    }
    .disabled {
        opacity: 0.5;
        cursor: default;
    }
</style>

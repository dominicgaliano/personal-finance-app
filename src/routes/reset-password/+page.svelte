<script lang="ts">
    import { handleSubmit } from "./utils";
    import ForceRedirectOnAuth from "../../components/ForceRedirectOnAuth.svelte";

    // TODO: Investigate, I have no idea how this works
    export let form;

    let email = "";
    let emailError = false;

    /**
     * Determines whether to enable the submit button
     *
     * @param email - user email
     * @returns boolean - whether the user input is valid
     */
    function softValidate(email: string): boolean {
        // TODO: implement more validation and error handling
        if (email.length < 1) {
            emailError = true;
            return false;
        }
        return true;
    }

    $: userInputValid = softValidate(email);
</script>

<div class="wrapper">
    <main>
        <h1 class="centered">Reset Password</h1>
        {#if form && form.success}
            <div class="success">
                <div>
                    You will receive an email with a link to reset your
                    password.
                </div>
                <a href="/login">Return to Login.</a>
            </div>
        {:else}
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
                <button type="submit" disabled={!userInputValid}
                    >Reset Password</button
                >
                <a href="/login">Returning user? Login.</a>
                {#if form && !form.success && form.message}
                    <div class="error-text">
                        <ForceRedirectOnAuth redirectPath="/" />
                        {form.message}
                    </div>
                {/if}
            </form>
        {/if}
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
    form > *, .success > * {
        display: block;
        margin: 1rem;
    }
    .success > * {
        text-align: center;
    }
    .error-text {
        color: red;
    }
</style>

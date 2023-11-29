<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import authStore from "../../stores/authStore";
    import { handleSubmit } from "./utils";

    onMount(() => {
        authStore.subscribe((state) => {
            if (state.user) {
                goto("/");
            }
        });
    });

    // TODO: Investigate, I have no idea how this works
    export let form;

    let email = "";
    let emailError = false;

    let password = "";
    let confirmPassword = "";
    let passwordError = false;

    function validateInputs(
        email: string,
        password: string,
        confirmPassword: string,
    ) {
        // TODO: implement more validation and error handling
        if (email.length < 1) {
            emailError = true;
            return false;
        }
        if (
            password.length < 1 ||
            confirmPassword.length < 1 ||
            password !== confirmPassword
        ) {
            passwordError = true;
            return false;
        }
        return true;
    }

    $: userInputValid = validateInputs(email, password, confirmPassword);
</script>

<div class="wrapper">
    <main>
        <h1 class="centered">Register</h1>
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
            <label for="confirm-password">Password</label>
            <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Conirm Password"
                required
                aria-invalid={passwordError}
                aria-describedby={passwordError ? "password-error" : null}
                autocomplete="new-password"
                bind:value={confirmPassword}
            />
            <button type="submit" disabled={!userInputValid}>Register</button>
            <a href="/login">Returning user? Login.</a>
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
</style>

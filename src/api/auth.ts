import { GenerateOtpMutationDocument, GenerateOtpMutationMutationVariables, ValidateOtpMutationDocument, ValidateOtpMutationMutationVariables } from "@/generated/graphql";
import urqlClient from "./graphql";

export const useGenerateOtpMutation = (variables: GenerateOtpMutationMutationVariables) => {
    return urqlClient.mutation(GenerateOtpMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}

export const useValidateOtpMutation = (variables: ValidateOtpMutationMutationVariables) => {
    return urqlClient.mutation(ValidateOtpMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}


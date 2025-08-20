import { reactive, computed } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// Step 1: Customer schema/state
export const customerSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(7, 'Teléfono inválido')
})
export type CustomerSchema = z.output<typeof customerSchema>
export const customerState = reactive<Partial<CustomerSchema>>({
  name: undefined,
  email: undefined,
  phone: undefined
})

// Step 2: Address schema/state
export const addressSchema = z.object({
  street: z.string().min(1, 'La calle es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  zip: z.string().min(3, 'Código postal inválido')
})
export type AddressSchema = z.output<typeof addressSchema>
export const addressState = reactive<Partial<AddressSchema>>({
  street: undefined,
  city: undefined,
  zip: undefined
})

// Step 3: Payment schema/state
const paymentSchemaBase = z.object({
  paymentMethod: z.enum(['card', 'paypal', 'bank']),
  // Campos de tarjeta solo requeridos si method === 'card'
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvc: z.string().optional()
})
export type PaymentSchema = z.output<typeof paymentSchemaBase>
export const paymentSchema = paymentSchemaBase.superRefine((data: PaymentSchema, ctx: z.RefinementCtx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Número de tarjeta requerido', path: ['cardNumber'] })
    if (!data.expiry) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Fecha de expiración requerida', path: ['expiry'] })
    if (!data.cvc) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CVC requerido', path: ['cvc'] })
  }
})
export const paymentState = reactive<Partial<PaymentSchema>>({
  paymentMethod: 'card',
  cardNumber: undefined,
  expiry: undefined,
  cvc: undefined
})

export const isCard = computed({
    get: () => paymentState.paymentMethod === 'card',
    set: (val: boolean) => { if (val) paymentState.paymentMethod = 'card' }
  })
  export const isPaypal = computed({
    get: () => paymentState.paymentMethod === 'paypal',
    set: (val: boolean) => { if (val) paymentState.paymentMethod = 'paypal' }
  })
  export const isBank = computed({
    get: () => paymentState.paymentMethod === 'bank',
    set: (val: boolean) => { if (val) paymentState.paymentMethod = 'bank' }
  })


// Helpers para handlers tipados (opcional)
export type CustomerSubmitEvent = FormSubmitEvent<CustomerSchema>
export type AddressSubmitEvent = FormSubmitEvent<AddressSchema>
export type PaymentSubmitEvent = FormSubmitEvent<PaymentSchema>

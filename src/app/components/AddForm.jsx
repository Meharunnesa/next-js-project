'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export default function AddForm() {

  const form = useForm({
    defaultValues: {
      username: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-[1280px] py-10 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormDescription>
                  This is your public display name.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
